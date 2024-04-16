const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  
  export function getLocaleDate(dateInMilliseconds: number): string {
    return new Date(dateInMilliseconds).toLocaleString(undefined, options);
  }
  