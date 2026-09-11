// Music content used across the public music page and homepage preview.
// Preview-only by design: no download URLs live here. Full/private tracks
// must be served through protected storage + signed URLs (see /music/private).

export type MusicType =
  | "Cover"
  | "Original"
  | "Tone Demo"
  | "Live Performance";

export type MusicStatus = "Public Preview" | "Private" | "In Progress";

export type MusicTrack = {
  id: string;
  title: string;
  type: MusicType;
  status: MusicStatus;
  description: string;
  // Visual accent for the waveform preview.
  accent: "teal" | "blue" | "mixed";
  // Whether to feature on the homepage music preview.
  featured: boolean;
};

export const music: MusicTrack[] = [
  {
    id: "guitar-tone-demo",
    title: "Guitar Tone Demo",
    type: "Tone Demo",
    status: "Public Preview",
    description:
      "A short exploration of warm, vocal lead tone on the PRS — chasing sustain and feel more than speed. A study in how a single sound can carry emotion.",
    accent: "teal",
    featured: true,
  },
  {
    id: "live-cover-performance",
    title: "Live Cover Performance",
    type: "Live Performance",
    status: "Public Preview",
    description:
      "A live take on a classic rock favorite — captured in one pass, imperfections and all. Performance is its own kind of design: timing, dynamics, and presence.",
    accent: "blue",
    featured: true,
  },
  {
    id: "original-idea-demo",
    title: "Original Idea / Demo",
    type: "Original",
    status: "In Progress",
    description:
      "A rough sketch of an original melodic idea, kept as a preview while the full arrangement comes together. Shared early, intentionally unfinished.",
    accent: "mixed",
    featured: true,
  },
  {
    id: "ambient-texture-study",
    title: "Ambient Texture Study",
    type: "Tone Demo",
    status: "Public Preview",
    description:
      "Layered, reverb-heavy textures exploring how space and decay change the emotional weight of a simple phrase.",
    accent: "teal",
    featured: false,
  },
  {
    id: "private-original-cut",
    title: "Original — Full Cut",
    type: "Original",
    status: "Private",
    description:
      "A more complete original arrangement kept private until it is finished. Available on request through the private listening room.",
    accent: "blue",
    featured: false,
  },
];

export function getFeaturedMusic(): MusicTrack[] {
  return music.filter((t) => t.featured);
}

export const gear = {
  guitar: "PRS SE Custom 24",
  processor: "NUX multi-effects processor",
  influence: "Classic and heavy rock, with an ear for melody",
  focus: "Tone, melody, and emotional phrasing over technical flash",
};
