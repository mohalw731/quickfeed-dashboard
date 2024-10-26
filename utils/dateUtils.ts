export const formatDate = (date: Date | null): string => {
    if (!date) return "No date available";
    return date.toISOString().split('T')[0];
  };
  