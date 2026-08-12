/** Positions, dates and descriptions as listed on LinkedIn. */

export type Role = {
  org: string;
  title: string;
  period: string;
  type?: string;
  location?: string;
  body?: string;
  points?: string[];
  /** Sub-entries for a single organisation with several programmes. */
  nested?: { title: string; period: string; body?: string }[];
};

export const experience: Role[] = [
  {
    org: "Confidential Government",
    title: "AI Engineer",
    period: "Apr 2025 to present",
    type: "Full-time",
    location: "Riyadh, on-site",
  },
  {
    org: "Stealth Startup",
    title: "AI Engineer",
    period: "Jun 2024 to Sep 2024",
    type: "Internship",
    location: "Riyadh, remote",
  },
  {
    org: "Tuwaiq Academy",
    title: "Internship",
    period: "Mar 2024 to Jul 2024",
    location: "Riyadh, on-site",
    nested: [
      {
        title: "AWS Solutions Architect Bootcamp",
        period: "Jun 2024 to Jul 2024",
      },
      {
        title: "SDAIA T5 Data Science Bootcamp",
        period: "Mar 2024 to Jun 2024",
        body: "Intensive programme covering data mining and analysis, machine learning, NLP, computer vision, predictive analytics, and ethics in data science and AI.",
      },
    ],
  },
  {
    org: "King Abdulaziz City for Science and Technology",
    title: "Computer Vision Intern",
    period: "Aug 2023 to Jan 2024",
    type: "Internship",
    location: "Riyadh, on-site",
    points: [
      "Implemented and compared computer vision algorithms in Python with OpenCV and YOLO, covering image processing, object detection and tracking.",
      "Collected data through image scraping and prepared annotated datasets with modern annotation tools.",
      "Contributed to image classification, object recognition, and image format conversion work across SVG, TIFF and JPEG.",
    ],
  },
];

export const education = {
  school: "King Saud University",
  degree: "Bachelor of Science, Computer Science",
  period: "2019 to 2024",
  honor: "Dean's Award for Academic Excellence, January 2022",
  project: "Fusion of Machine Learning Techniques for Phonocardiography",
};
