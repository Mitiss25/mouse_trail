const traits = document.querySelectorAll('.trait');

const smoothPointer = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
};

const totalPointsArray = [40,35,30,25,20,15,10];

window.addEventListener('mousemove', (e)=> {
    gsap.to(smoothPointer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
    })
});

function updatePath() {
    traits.forEach((path, index)=> {
        let points = path.points || [];
        points.unshift({...smoothPointer});
        while (points.length > totalPointsArray[index]) {
            points.pop();
        }
        path.points = points;

        if (points.length > 1) {
            let d =`M ${points[0].x} ${points[0].y}`;
            for (let i=1; i < points.length; i++){
                d += ` L ${points[i].x} ${points[i].y}`;
            }
            path.setAttribute('d', d);
        }
    });

    requestAnimationFrame(updatePath);
}

updatePath();