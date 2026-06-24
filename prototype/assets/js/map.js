/* ==========================================================================
   Mapa — wrapper fino sobre Leaflet
   Tiles: CARTO Positron (claro/minimalista, sem chave de API).
   ========================================================================== */

const MapKit = (() => {
  const TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const ATTR =
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>';

  function base(el, opts = {}) {
    const map = L.map(el, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile ? true : true,
      tap: false,
      ...opts,
    });
    L.tileLayer(TILES, { attribution: ATTR, maxZoom: 19, subdomains: "abcd" }).addTo(map);
    return map;
  }

  function pin(text, variant) {
    return L.divIcon({
      className: "",
      html: `<div class="pin ${variant === "dest" ? "pin--dest" : ""}"><span>${text}</span></div>`,
      iconSize: [34, 34],
      iconAnchor: [8, 32],
    });
  }

  // Mapa "hero" da home: um marcador por carona disponível
  function home(el, caronas, onPick) {
    const map = base(el);
    const group = [];
    caronas.forEach((c) => {
      const m = L.marker([c.de.lat, c.de.lng], { icon: pin("R$" + c.rateio) }).addTo(map);
      m.on("click", () => onPick && onPick(c.id));
      group.push([c.de.lat, c.de.lng]);
    });
    L.marker([UNB.lat, UNB.lng], { icon: pin("UnB", "dest") }).addTo(map);
    group.push([UNB.lat, UNB.lng]);
    map.fitBounds(group, { padding: [48, 48], maxZoom: 12 });
    return map;
  }

  // Mapa de detalhe: origem -> destino com linha
  function route(el, de, para) {
    const map = base(el);
    const a = [de.lat, de.lng];
    const b = [para.lat, para.lng];
    L.polyline([a, b], {
      color: "#178049", weight: 4, opacity: .9, dashArray: "1 9", lineCap: "round",
    }).addTo(map);
    L.marker(a, { icon: pin("●") }).addTo(map);
    L.marker(b, { icon: pin("UnB", "dest") }).addTo(map);
    map.fitBounds([a, b], { padding: [42, 42], maxZoom: 13 });
    return map;
  }

  return { home, route };
})();
