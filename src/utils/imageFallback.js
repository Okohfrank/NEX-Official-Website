export const getPersonFallbackImage = (name = 'NEX Member') => {
  const formattedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${formattedName}&background=09090b&color=ffffff&size=512&bold=true&font-size=0.35`;
};

export const getProjectFallbackImage = (title = 'NEX Project') => {
  const encodedTitle = encodeURIComponent(title);
  return `https://ui-avatars.com/api/?name=${encodedTitle}&background=18181b&color=ffffff&size=600&bold=true&font-size=0.25`;
};

export const handleImageError = (e, fallbackType = 'person', name = 'NEX') => {
  e.currentTarget.onerror = null;
  if (fallbackType === 'person') {
    e.currentTarget.src = getPersonFallbackImage(name);
  } else {
    e.currentTarget.src = getProjectFallbackImage(name);
  }
};
