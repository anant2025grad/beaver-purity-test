
export function calculatePurityScore(
  selectedCount: number
): number {
  return Math.max(0, Math.min(100, 100 - selectedCount));
}

export function getScoreTitle(score: number): string {
  if (score >= 90) return "The Freshman";
  if (score >= 75) return "The Model Beaver";
  if (score >= 60) return "The Campus Regular";
  if (score >= 40) return "The Harmony Hall Veteran";
  if (score >= 20) return "The Campus Menace";
  return "The Beaver Legend";
}

export function getScoreDescription(score: number): string {
  if (score >= 90) {
    return "Somehow, you've managed to stay innocent.";
  }

  if (score >= 75) {
    return "You've experienced campus life, but kept it respectable.";
  }

  if (score >= 60) {
    return "You know your way around Beaver. Maybe a little too well.";
  }

  if (score >= 40) {
    return "Harmony Hall has probably heard your name.";
  }

  if (score >= 20) {
    return "You've definitely contributed to campus lore.";
  }

  return "At this point, you are campus lore.";
}
