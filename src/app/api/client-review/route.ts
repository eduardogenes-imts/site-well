import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SectionKey = "home" | "menu" | "manifesto" | "process" | "studio" | "projects" | "contact";

const SECTION_KEYS: SectionKey[] = ["home", "menu", "manifesto", "process", "studio", "projects", "contact"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = readText(formData, "name");
    const reviewDate = readText(formData, "reviewDate");
    const alignment = readText(formData, "alignment");
    const alignmentComment = readText(formData, "alignmentComment");
    const brandDirection = readText(formData, "brandDirection");
    const materialsLink = readText(formData, "materialsLink");
    const materialsOrganization = readText(formData, "materialsOrganization");
    const textStatus = readText(formData, "textStatus");
    const textNotes = readText(formData, "textNotes");
    const priority1 = readText(formData, "priority1");
    const priority2 = readText(formData, "priority2");
    const priority3 = readText(formData, "priority3");

    if (!name || !alignment || !brandDirection || !materialsLink || !textStatus || !priority1) {
      return NextResponse.json(
        { ok: false, error: "Preencha os campos obrigatórios antes de enviar." },
        { status: 400 },
      );
    }

    const decisionsBySection = SECTION_KEYS.reduce<Record<SectionKey, string>>(
      (accumulator, section) => {
        const value = readText(formData, `${section}Decision`);
        if (!value) {
          throw new Error(`Campo obrigatório ausente: ${section}Decision`);
        }
        accumulator[section] = value;
        return accumulator;
      },
      { home: "", menu: "", manifesto: "", process: "", studio: "", projects: "", contact: "" },
    );

    const worksBySection = SECTION_KEYS.reduce<Record<SectionKey, string>>(
      (accumulator, section) => {
        accumulator[section] = readText(formData, `${section}Works`);
        return accumulator;
      },
      { home: "", menu: "", manifesto: "", process: "", studio: "", projects: "", contact: "" },
    );

    const adjustsBySection = SECTION_KEYS.reduce<Record<SectionKey, string>>(
      (accumulator, section) => {
        accumulator[section] = readText(formData, `${section}Adjust`);
        return accumulator;
      },
      { home: "", menu: "", manifesto: "", process: "", studio: "", projects: "", contact: "" },
    );

    const submissionId = buildSubmissionId();

    const payload = {
      id: submissionId,
      createdAt: new Date().toISOString(),
      source: {
        userAgent: request.headers.get("user-agent") || "",
      },
      respondent: {
        name,
        reviewDate,
      },
      generalImpression: {
        alignment,
        comment: alignmentComment,
      },
      brandDirection,
      sectionFeedback: {
        decisions: decisionsBySection,
        worksWell: worksBySection,
        adjustments: adjustsBySection,
      },
      contentAndMaterials: {
        materialsLink,
        organizationByProject: materialsOrganization,
      },
      textContent: {
        status: textStatus,
        notes: textNotes,
      },
      priorities: [priority1, priority2, priority3].filter(Boolean),
    };

    const usedSupabase = await saveReview(payload);

    return NextResponse.json({ ok: true, id: submissionId, storage: usedSupabase ? "supabase" : "local" }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível processar o envio.";

    if (message.includes("Campo obrigatório ausente")) {
      return NextResponse.json({ ok: false, error: "Faltam campos obrigatórios no formulário." }, { status: 400 });
    }

    return NextResponse.json(
      { ok: false, error: "Erro interno ao salvar a revisão. Tente novamente." },
      { status: 500 },
    );
  }
}

async function saveReview(payload: {
  id: string;
  createdAt: string;
  source: { userAgent: string };
  respondent: { name: string; reviewDate: string };
  generalImpression: { alignment: string; comment: string };
  brandDirection: string;
  sectionFeedback: {
    decisions: Record<SectionKey, string>;
    worksWell: Record<SectionKey, string>;
    adjustments: Record<SectionKey, string>;
  };
  contentAndMaterials: { materialsLink: string; organizationByProject: string };
  textContent: { status: string; notes: string };
  priorities: string[];
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseServiceRoleKey) {
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/client_reviews`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify([
        {
          id: payload.id,
          created_at: payload.createdAt,
          respondent_name: payload.respondent.name,
          review_date: payload.respondent.reviewDate,
          alignment: payload.generalImpression.alignment,
          priority_1: payload.priorities[0] || null,
          priority_2: payload.priorities[1] || null,
          priority_3: payload.priorities[2] || null,
          payload,
        },
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Falha ao salvar no Supabase: ${details || response.statusText}`);
    }

    return true;
  }

  const rootDataDir = path.join(process.cwd(), "data", "client-reviews");
  await mkdir(rootDataDir, { recursive: true });
  const jsonPath = path.join(rootDataDir, `${payload.id}.json`);
  await writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");

  return false;
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function buildSubmissionId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const time = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(
    2,
    "0",
  )}${String(now.getSeconds()).padStart(2, "0")}`;
  const random = Math.random().toString(36).slice(2, 7);

  return `review-${year}${month}${day}-${time}-${random}`;
}
