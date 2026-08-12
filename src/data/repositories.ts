/**
 * Smaller shipped work. Descriptions are written from the source, not copied
 * from the README. Stars and last-push dates are read live from the GitHub
 * public API at build time; the list renders fine without them.
 */

export type Repository = {
  name: string;
  blurb: string;
  tags: string[];
};

export const repositories: Repository[] = [
  {
    name: "Semantic-Search-App",
    blurb:
      "Weekly job that pulls new arXiv papers on retrieval, summarizes each abstract with a Groq-hosted Llama 3, embeds it, and loads the result into Supabase for semantic search. Scheduled with GitHub Actions.",
    tags: ["ETL", "Embeddings", "Supabase"],
  },
  {
    name: "Gradio-PDF-Chatbot-with-Citation",
    blurb:
      "Document chat over an Arabic policy PDF using semantic chunking and hybrid search in Qdrant, with DSPy driving the generation and citations attached to each answer.",
    tags: ["RAG", "DSPy", "Qdrant"],
  },
  {
    name: "Car-Detection-with-BentoML-and-ONNX-Runtime",
    blurb:
      "A PyTorch classifier exported to ONNX and served through BentoML, so inference runs on the ONNX runtime rather than the training stack.",
    tags: ["Serving", "ONNX", "BentoML"],
  },
  {
    name: "Bentoml-yolov10",
    blurb:
      "Object detection API around YOLOv10, packaged as a BentoML service with a bentofile and a Python client.",
    tags: ["Serving", "Computer vision"],
  },
  {
    name: "Transformers-API-Deployment-Guide",
    blurb:
      "Walkthrough for taking a Transformers model from a local serving command to a custom Docker image to a Kubernetes deployment on Minikube.",
    tags: ["Deployment", "Kubernetes", "Docker"],
  },
  {
    name: "Data-Visualization-agent",
    blurb:
      "Upload a CSV or Excel file, describe the chart in plain language, and an LLM writes the Plotly figure. Includes generated summaries of numeric, categorical and datetime columns.",
    tags: ["Agents", "Plotly"],
  },
  {
    name: "Agentic-Scraper-App",
    blurb:
      "Structured web extraction with AgentQL queries over Playwright, including pagination handling and CSV or JSON export.",
    tags: ["Agents", "Playwright"],
  },
  {
    name: "ETL-Pipeline-Using-AirFlow-And-Astro",
    blurb:
      "Airflow DAG on Astronomer that extracts event data from a public API, reshapes it, and loads it into PostgreSQL, with DAG integrity tests.",
    tags: ["Airflow", "PostgreSQL"],
  },
];
