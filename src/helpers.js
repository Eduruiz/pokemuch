export default function getPokemonIdFromURL(url) {
  return url.split(/\/(\d\d?\d?)\//)[1];
}
