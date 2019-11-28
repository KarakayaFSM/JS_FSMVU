const CACHE = "AP";
function installCB(e) {
  console.log(CACHE, e);
}

addEventListener("install", installCB);

function save(req, resp) {
  if (!req.url.includes("github")) return resp;
  return caches
    .open(CACHE)
    .then(cache => {
      // save request
      cache.put(req, resp.clone());
      return resp;
    })
    .catch(console.err);
}

function report(req) {
  console.log(CACHE + " matches " + req.url);
  return req;
}

function cacheCB(e) { //cache first
    let req = e.request
    e.respondWith(
      caches.match(req)
      .then(r1 => r1 || fetch(req))
      .catch(console.log)
    )
  }
  self.addEventListener('fetch', cacheCB)

function fetchCB(e) {
  //fetch first
  let req = e.request;
  e.respondWith(
    fetch(req)
      .then(r2 => save(req, r2))
      .catch(() => caches.match(req).then(report))
  );
}

addEventListener("fetch", fetchCB);

function activateCB(e) {
  console.log(CACHE, e);
}

addEventListener("activate", activateCB);
