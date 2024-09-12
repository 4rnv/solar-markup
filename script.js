document.querySelectorAll('.planet').forEach(planet => {
    planet.addEventListener('click', () => {
        planet.classList.toggle('active');
    });
  });

document.querySelectorAll('.moon').forEach(moon => {
    moon.addEventListener('click', () => {
        moon.classList.toggle('active');
    });
});
  
document.querySelectorAll('.solar-system-objects article').forEach(object => {
    object.addEventListener('click', () => {
        object.classList.toggle('active');
    });
});