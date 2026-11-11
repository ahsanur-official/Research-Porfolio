export interface Publication {
  id: string;
  year: number;
  type: string;
  venue: string;
  venueFull: string;
  length: string;
  status: "Accepted" | "Submitted / Under Review";
  title: string;
  isExtended?: boolean;
  authors: string[];
  summary: string;
  abstract: string;
  keywords: string[];
  keyContributions: string[];
  bibtex: string;
  tags: string[];
  metrics?: { label: string; value: string; color: string }[];
  note?: string;
}

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: "ieee-csde-2026-cyclegan",
    year: 2026,
    type: "Conference Paper (Peer-Reviewed)",
    venue: "IEEE CSDE 2026",
    venueFull: "IEEE Asia-Pacific Conference on Computer Science and Data Engineering (IEEE CSDE 2026)",
    length: "6 Pages",
    status: "Accepted",
    title: "Reference-Conditioned Healthy-Like EEG Reconstruction Using Movement-Aware CycleGAN for Motor Imagery BCI",
    authors: ["Md. Masjidul Islam", "Md. Ahsanur Rahaman", "Mrittika Mahbub"],
    note: "Accepted in IEEE Xplore (Scopus-Indexed). Preliminary initial abstract previously presented at RICRF 2026.",
    summary:
      "Presents a movement-aware CycleGAN reconstructing healthy-like EEG from stroke and intracerebral-hemorrhage motor-imagery trials for stroke rehabilitation BCI. Evaluated across 180 held-out trial pairs under a strict subject-level holdout protocol, reaching 89.01% ± 3.14% healthy-domain similarity (SH) and 70.95% ± 6.71% composite validation score (V). Demonstrates that removing movement consistency causes validation score collapse, verifying genuine movement preservation.",
    abstract:
      "This paper presents a movement-aware CycleGAN that reconstructs healthy-like EEG from stroke and intracerebral-hemorrhage motor-imagery trials for stroke-rehabilitation BCI. Given a stroke epoch, the model retrieves a same-label healthy reference via nearest-neighbor matching over channel statistics, derivative energy, and mu/beta band power, then a conditional generator maps the stroke signal toward the healthy domain under eight objectives (adversarial, cycle-consistency, identity, spectral, band-power, transient, anti-copy, and movement-consistency). Under an identical subject-level holdout protocol, three configurations are compared (32-channel HEFMI-ICH-only Run A, 23-channel Run B, and 23-channel cross-dataset-augmented Run C, the primary configuration), together with five single-term loss ablations, two alternative-conditioning baselines, subject-level 5-fold cross-validation, trial-level bootstrap and Wilcoxon significance testing, a downstream motor-imagery classification benchmark, and a corrected, fully-measured 20-channel out-of-distribution check on an independent lower-limb dataset. Run A reached 89.01% ± 3.14% healthy-domain similarity (SH) and a 70.95% ± 6.71% composite validation objective (V) over 180 held-out trial pairs, versus 78.81% ± 2.71% V for a trivial identity-mapping baseline. Removing the movement-consistency loss collapses V from 70.95% to 0.34% despite SH increasing to 91.84%, directly confirming that healthy-similarity alone is an unreliable indicator of genuine reconstruction. These results support the feasibility of subject-level held-out healthy-like reconstruction, though the output should be read as a computational estimate rather than a medically verified recovery signal.",
    keywords: ["EEG", "Motor Imagery", "Stroke Rehabilitation", "Brain-Computer Interface", "CycleGAN", "Domain Adaptation", "Ablation Study", "Cross-Validation"],
    keyContributions: [
      "Rigorous 8-objective loss formulation: adversarial, cycle-consistency, identity, spectral, band-power, transient, anti-copy, and movement-consistency.",
      "Strict patient-level holdout protocol: 180 trial pairs withheld across independent subjects to prevent data leakage.",
      "5 single-term loss ablations, 2 alternative-conditioning baselines, subject-level 5-fold CV, and Wilcoxon significance testing.",
      "Downstream motor-imagery classification benchmark + corrected 20-channel out-of-distribution lower-limb evaluation.",
      "Accepted in IEEE Xplore Scopus-indexed conference track."
    ],
    bibtex: `@inproceedings{islam2026ieeecsde,
  title={Reference-Conditioned Healthy-Like EEG Reconstruction Using Movement-Aware CycleGAN for Motor Imagery BCI},
  author={Islam, Md. Masjidul and Rahaman, Md. Ahsanur and Mahbub, Mrittika},
  booktitle={IEEE Asia-Pacific Conference on Computer Science and Data Engineering (CSDE)},
  year={2026},
  pages={1--6},
  publisher={IEEE},
  status={Accepted}
}`,
    tags: ["EEG", "Motor Imagery", "Stroke Rehabilitation", "Brain-Computer Interface", "CycleGAN", "Domain Adaptation"],
    metrics: [
      { label: "Healthy-Domain Similarity (SH)", value: "89.01% ± 3.14%", color: "text-emerald-400" },
      { label: "Composite Score (V)", value: "70.95% ± 6.71%", color: "text-cyan-400" },
      { label: "Movement Loss Ablation V", value: "Collapses to 0.34%", color: "text-rose-400" },
      { label: "Validation Protocol", value: "5-Fold CV + Wilcoxon", color: "text-indigo-400" }
    ]
  },
  {
    id: "iceeict-2027-diffusion-parkinsons",
    year: 2026,
    type: "Conference Paper (Under Review)",
    venue: "ICEEICT 2027",
    venueFull: "International Conference on Electrical, Computer and Communication Engineering (ICEEICT 2027)",
    length: "6 Pages",
    status: "Submitted / Under Review",
    title: "Reference-Conditioned Diffusion-Based EEG Reconstruction for Parkinson's Disease Detection: A Comparative Evaluation with Transformer and Self-Supervised Baselines",
    authors: ["Md. Masjidul Islam", "Md. Ahsanur Rahaman", "Mrittika Mahbub", "Suraiya Jahan"],
    note: "Currently undergoing peer review. Benchmark evaluation on clinical dataset OpenNeuro ds008768.",
    summary:
      "Investigates a reference-conditioned EEG framework transforming Parkinson's disease (PD) patient signals toward a healthy representation across 282 recordings (175 PD, 107 controls, ds008768) with 3-fold subject-level CV. Following discovery and correction of a group-asymmetric artifact, the Transformer achieved the highest mean AUROC of 0.751 (69.2% accuracy, 0.729 F1-score) using combined raw/reconstructed features, while conditional diffusion achieved 0.633 AUROC and MAE achieved 0.695–0.725.",
    abstract:
      "We present a reference-conditioned EEG framework for Parkinson’s disease (PD) that transforms patient EEG toward a healthy-reference representation to assess disease discrimination. A conditional diffusion model is compared with a Transformer and masked autoencoder (MAE) under a unified protocol. We used 3-fold subject-level CV on 282 recordings (175 PD, 107 controls) from ds008768 resting EEG. References were selected from fold-training data using task, sex, age, and band-power matching. The framework combines reference reconstruction, spectral and band-power constraints, anti-copy regularization, and disease-consistency objectives, followed by subject classification. Development identified a group-asymmetric artifact: healthy controls bypassed reconstruction while PD samples were transformed, causing spuriously near-perfect separability. We corrected this by applying an identical pathway to both groups. Under the corrected protocol, the Transformer achieved the highest mean AUROC of 0.751 using combined raw/reconstructed features, with 69.2% accuracy and 0.729 F1-score. Its reconstructed features alone achieved 0.705 AUROC. Diffusion reconstruction achieved 0.633 AUROC versus 0.699 for its raw baseline, while MAE achieved 0.695–0.725 depending on the classifier. These results indicate that diffusion reconstruction alone does not yet provide a consistent disease-discriminative advantage. Confusion matrices, ablations, computational cost, and reconstruction diagnostics provide a reproducible baseline for clinical EEG evaluation. Fold variation and limited reconstruction benefit support cautious interpretation and broader subject-level validation with severity labels, independent cohorts, prospective testing, larger clinical populations, diverse patients, and external validation.",
    keywords: ["EEG", "Parkinson’s Disease", "Diffusion Models", "Reference-Conditioned Reconstruction", "Transformer", "Masked Autoencoder", "Brain-Computer Interface", "Subject-Level Cross-Validation"],
    keyContributions: [
      "Benchmark on 282 clinical recordings (175 PD, 107 controls) from OpenNeuro ds008768 under 3-fold subject-level cross-validation.",
      "Uncovered and corrected a critical group-asymmetric pipeline artifact ensuring unbiased evaluation across disease classes.",
      "Comparative evaluation between Conditional Diffusion (DDPM), Transformer architectures, and Masked Autoencoder (MAE) baselines.",
      "Established reproducibility benchmarks with full confusion matrices, ablation profiles, and computational cost profiling."
    ],
    bibtex: `@inproceedings{islam2027iceeict,
  title={Reference-Conditioned Diffusion-Based EEG Reconstruction for Parkinson's Disease Detection: A Comparative Evaluation with Transformer and Self-Supervised Baselines},
  author={Islam, Md. Masjidul and Rahaman, Md. Ahsanur and Mahbub, Mrittika and Jahan, Suraiya},
  booktitle={International Conference on Electrical, Computer and Communication Engineering (ICEEICT)},
  year={2027},
  pages={1--6},
  status={Submitted}
}`,
    tags: ["EEG", "Parkinson’s Disease", "Diffusion Models", "Reference-Conditioned Reconstruction", "Transformer", "Masked Autoencoder"],
    metrics: [
      { label: "Transformer Raw+Recon AUROC", value: "0.751 (69.2% Acc)", color: "text-cyan-400" },
      { label: "Clinical Cohort Scale", value: "282 Recordings (175 PD, 107 Controls)", color: "text-indigo-400" },
      { label: "MAE Feature AUROC", value: "0.695 – 0.725", color: "text-purple-400" },
      { label: "Cross-Validation Protocol", value: "3-Fold Subject-Level CV", color: "text-emerald-400" }
    ]
  }
];
