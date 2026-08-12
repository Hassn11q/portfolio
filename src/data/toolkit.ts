/**
 * Grouped by the layer of the system it belongs to, which is also the shape of
 * the work: data in, model in the middle, service around it, interface on top.
 * `icon` is a Simple Icons slug; entries without one render as a wordmark.
 * Every entry appears in a shipped repository, the published paper, or a
 * LinkedIn-listed skill.
 */

export type Tool = { name: string; icon?: string };

export type ToolGroup = {
  title: string;
  note: string;
  items: Tool[];
};

export const toolkit: ToolGroup[] = [
  {
    title: "Models and training",
    note: "Fine-tuning, evaluation, and the regularization that decides low-resource results.",
    items: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "scikit-learn", icon: "scikitlearn" },
      { name: "ONNX", icon: "onnx" },
      { name: "OpenCV", icon: "opencv" },
      { name: "Optuna" },
      { name: "Whisper" },
    ],
  },
  {
    title: "Language models and agents",
    note: "Retrieval, tool calling, and the evaluation of both. Most of the work sits here.",
    items: [
      { name: "LangChain", icon: "langchain" },
      { name: "LlamaIndex" },
      { name: "vLLM", icon: "vllm" },
      { name: "Ollama", icon: "ollama" },
      { name: "DSPy" },
      { name: "CrewAI" },
      { name: "ReAct agents" },
      { name: "RAG" },
    ],
  },
  {
    title: "Serving and infrastructure",
    note: "Getting a model behind an endpoint and keeping it there.",
    items: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "BentoML", icon: "bentoml" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Linux", icon: "linux" },
      { name: "NVIDIA", icon: "nvidia" },
      { name: "pytest", icon: "pytest" },
    ],
  },
  {
    title: "Data, storage and interface",
    note: "Vector stores for retrieval, Postgres for everything else, and the surface people actually use.",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Qdrant", icon: "qdrant" },
      { name: "Supabase", icon: "supabase" },
      { name: "Apache Kafka", icon: "apachekafka" },
      { name: "Apache Airflow", icon: "apacheairflow" },
      { name: "pandas", icon: "pandas" },
      { name: "Streamlit", icon: "streamlit" },
      { name: "Gradio", icon: "gradio" },
    ],
  },
];
