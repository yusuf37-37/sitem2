// ==========================================================================
// YUSUF KİŞİSEL WEB SİTESİ - SCRİPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const ustMenu = document.querySelector('.ust-menu');

  // Menü bağlantılarına tıklandığında yumuşak kaydırma ve menü yüksekliğini hesaba katma
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const hedefId = link.getAttribute('href');
      if (hedefId && hedefId.startsWith('#')) {
        const hedefBolum = document.querySelector(hedefId);
        if (hedefBolum) {
          e.preventDefault();
          const menuYukseklik = ustMenu ? ustMenu.offsetHeight : 0;
          const hedefKonum = hedefBolum.getBoundingClientRect().top + window.pageYOffset - menuYukseklik;

          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

          window.scrollTo({
            top: hedefKonum,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      }
    });
  });

  // Kaydırma sırasında aktif bölümü belirleme (Scroll Spy)
  const guncelleAktifLink = () => {
    const menuYukseklik = ustMenu ? ustMenu.offsetHeight : 0;
    const kaydirmaKonumu = window.pageYOffset + menuYukseklik + 50;

    sections.forEach(bolum => {
      const bolumUst = bolum.offsetTop;
      const bolumYukseklik = bolum.offsetHeight;
      const bolumId = bolum.getAttribute('id');

      if (kaydirmaKonumu >= bolumUst && kaydirmaKonumu < bolumUst + bolumYukseklik) {
        navLinks.forEach(link => {
          link.classList.remove('aktif');
          if (link.getAttribute('href') === `#${bolumId}`) {
            link.classList.add('aktif');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', guncelleAktifLink, { passive: true });
  guncelleAktifLink();
});
