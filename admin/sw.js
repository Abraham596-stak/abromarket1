// Ancienne adresse de l'application : ce service se désactive tout seul.
// Il retire l'abonnement aux notifications de cette adresse (sinon chaque notification arrivait en double)
// et laisse uniquement la nouvelle adresse : https://livraison-gratuite.github.io/admin/
async function arreter(){
  try { const s = await self.registration.pushManager.getSubscription(); if (s) await s.unsubscribe(); } catch(e){}
  try { const k = await caches.keys(); await Promise.all(k.map(x => caches.delete(x))); } catch(e){}
  try { await self.registration.unregister(); } catch(e){}
}
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(arreter()));
self.addEventListener('push', e => e.waitUntil(arreter()));
