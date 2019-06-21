const NOODLES = {
  RICE: {
    colors: ['#deb887', '#cdaa7d'],
    thickness: 8,
  },
  EGG: {
    colors: ['yellow', 'orange'],
    thickness: 8,
  },
}
const INACTIVE_LIMIT = 5000
const OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: [0, 0.25, 0.5, 0.75, 1.0],
}
export { NOODLES, INACTIVE_LIMIT, OBSERVER_OPTIONS }
