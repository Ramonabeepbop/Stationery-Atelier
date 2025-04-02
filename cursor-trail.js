// Array of image URLs (you can add more if needed)
const images = [
    'https://static-00.iconduck.com/assets.00/favorite-star-sparkle-1-icon-512x512-vrkoa4y7.png',  // Replace with your first image URL
    'https://media.lordicon.com/icons/wired/gradient/2474-sparkles-glitter.svg',  // Replace with your second image URL
    'Sparkle1.png'   // Replace with your third image URL
];

// Event listener for mouse movement
document.addEventListener('mousemove', function(e) {
    const trailInterval = 200;  // Less frequent trail appearances

    const trail = document.createElement('div');
    trail.classList.add('trail');  // Assign the 'trail' class to the element
    
    // Randomly select one image from the images array
    const randomImage = images[Math.floor(Math.random() * images.length)];
    trail.style.backgroundImage = `url("${randomImage}")`;  // Set the background image
    
    // Position the trail at the cursor's location
    trail.style.left = `${e.pageX - 15}px`;  // Adjust offset to center the trail at cursor
    trail.style.top = `${e.pageY - 15}px`;   // Adjust offset to center the trail at cursor
    
    // Append the trail to the body (or any container)
    document.body.appendChild(trail);
    
    // Remove the trail element after the animation completes (500ms)
    setTimeout(() => {
        trail.remove();
    }, 500);  // Match the duration of the animation
});
