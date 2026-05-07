export const projects = [
  {
    id: 1,
    title: "Facial Detection Emotion",
    description: "Ce projet utilise Deep Learning pour détecter les visages dans des images et prédire les émotions associées. Il combine OpenCV, TensorFlow/Keras, et FastAPI pour créer une API capable de traiter des images en temps réel.",
    tags: ["Python", "TensorFlow", "OpenCV", "FastAPI", "CNN"]
  },
  {
    id: 2,
    title: "HR-Pulse",
    subtitle: "Automated Job Offer Analysis Platform",
    description: "A full-stack AI-powered platform that automates the analysis of job offers, extracts key skills using NER, predicts salary ranges, and exposes everything through a modern API — fully containerized and observable.",
    tags: ["Python", "FastAPI", "NER", "Hugging Face", "Docker", "PostgreSQL", "MLflow"]
  },
  {
    id: 3,
    title: "RetentionAI",
    subtitle: "Smart HR Assistant for Predicting Employee Turnover",
    description: "RetentionAI is a full-stack HR analytics platform combining supervised machine learning and generative AI. It exposes a secure JWT-based API, uses PostgreSQL for data persistence, and is containerized with Docker to deliver an explainable, scalable, and production-ready solutio",
    tags: ["Python", "Docker", "JWT", "Matplotlib", "Supervised Machine Learning", "FastAPI", "Scikit-learn", "Prompt Engineering", "Generative AI"]
  },
  {
    id: 4,
    title: "Quant-AI_pr-diction_prix_Bitcoin",
    subtitle: "End-to-End ML Deployment Platform",
    description: "The project aims to create an end-to-end platform that collects Binance data, calculates technical indicators, trains a Machine Learning model to predict the price of Bitcoin over the next 10 minutes, and exposes the results via a REST API",
    tags: ["Docker", "Data Science", "Machine Learning", "Airflow", "JWT", "PySpark", "Data Engineering", "Regression Models", "MLflow", "FastAPI"]
  },
  {
    id: 5,
    title: "RAG-AI_Assistant",
    subtitle: "AI Assistant using RAG for support IT",
    description: "An internal intelligent assistant capable of reliably answering IT technicians’ questions based on an IT support PDF (procedures, incidents, FAQs)",
    tags: ["postgres", "machine-learning", "jwt", "jupyter", "docker-compose", "postgresql", "ci-cd", "python3", "rag", "mlflow", "fastapi", "huggingface", "langchain"]
  },
  {
    id: 6,
    title: "NLP-Classification_Support_Tickets",
    subtitle: "NLP-based classification of support tickets",
    description: "End-to-end NLP batch pipeline for IT support ticket classification, covering data exploration, text preprocessing",
    tags: ["python", "nlp", "kubernetes", "machine-learning", "grafana", "prometheus", "mlops", "github-actions", "huggingface", "evidently", "chromadb"]
  },
  {
    id: 7,
    title: "LSM-TALK",
    subtitle: "AI-based sign language recognition system",
    description: "This repository showcases an AI-based sign language recognition system using MediaPipe for real-time keypoint extraction and LSTM neural networks for temporal gesture recognition, aiming to improve accessibility through intelligent human–computer interaction.",
    tags: ["Python", "MediaPipe", "LSTM", "Computer Vision", "AI"]
  }
];

export const experiences = [
  {
    title: "AI Engineer",
    from: "Oct 2025",
    to: "Mars 2026",
    company: "Simplon",
    type: "Certificate",
  },
  {
    title: "Manager",
    from: "Dec 2019",
    to: "Nov 2024",
    company: "Business Family",
    type: "Personal"
  },
  {
    title: "Telesales & Customer Service Agent",
    from: "June 2015",
    to: "Sept 2019",
    company: "Webhelp",
    type: "CDI"
  },
  {
    title: "Webmarketer",
    from: "Jan 2013",
    to: "Apr 2015",
    company: "COMELIA",
    type: "CDI"
  },
  {
    title: "Banking Customer Service",
    from: "Jul 2012",
    to: "Dec 2012",
    company: "Banque Populaire",
    type: "CDD"
  },
  {
    title: "Training",
    from: "Jul 2011",
    to: "Aug 2011",
    company: "Agence National Des Port",
    type: "Training"
  }
];

export const skills = [
  { title: "🐍 Programming", desc: "Solid foundations in scripted, queried, and dynamic programming across data, backend, and web contexts.", tags: ["Python", "SQL", "JavaScript"] },
  { title: "🧠 AI / Machine Learning", desc: "Building and deploying intelligent models — from image recognition to language understanding and retrieval-augmented generation.", tags: ["Computer Vision", "TensorFlow", "Keras", "LSTM", "CNN", "NLP", "LLM", "Hugging Face", "RAG", "Scikit-learn"] },
  { title: "⚙️ Backend & APIs", desc: "Designing fast, secure, and scalable server-side logic and authenticated API pipelines.", tags: ["FastAPI", "Django", "REST APIs", "JWT"] },
  { title: "🗄️ Data & Databases", desc: "Structuring, querying, and transforming data for reliable analytical and production pipelines.", tags: ["PostgreSQL", "Azure SQL", "Pandas", "NumPy", "Data Processing"] },
  { title: "☁️ Cloud & MLOps", desc: "End-to-end ML lifecycle management — from containerized deployments to observability and automated pipelines.", tags: ["Docker", "Podman", "Terraform", "GitHub Actions", "CI/CD", "Azure", "Kubernetes", "MLflow", "Evidently", "OpenTelemetry", "Jaeger"] },
  { title: "🖥️ Frontend", desc: "Crafting modern, responsive, and data-driven interfaces for web and ML applications.", tags: ["Next.js", "TailwindCSS", "Streamlit", "HTML", "CSS"] },
  { title: "📈 Web Marketing", desc: "Driving organic visibility through strategic keyword targeting, traffic analysis, and search engine optimization." },
  { title: "📞 Commercial & Sales", desc: "Proven track record in remote sales, client acquisition, and communication-driven conversion." },
  { title: "🏦 Banking Customer Service", desc: "Delivering high-quality support in regulated environments with precision, empathy, and compliance." }
];
