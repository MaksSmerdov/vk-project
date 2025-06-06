export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const getInitials = (name: string = '', surname: string = '') => {
  const firstNameInitial = name ? name[0].toUpperCase() : '';
  const lastNameInitial = surname ? surname[0].toUpperCase() : '';
  return firstNameInitial + lastNameInitial;
};
