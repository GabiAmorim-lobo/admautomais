document.getElementById('image-upload').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const image = document.getElementById('uploaded-image');
        image.src = reader.result;
        image.style.display = 'block';

        // Mostrar o overlay quando a imagem for carregada
        const textOverlay = document.getElementById('text-overlay');
        textOverlay.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('custom-text').addEventListener('input', function(event) {
    const textOverlay = document.getElementById('text-overlay');
    textOverlay.textContent = event.target.value;
});

document.getElementById('download-button').addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = document.getElementById('uploaded-image');
    const text = document.getElementById('custom-text').value;

    // Ajustar o tamanho do canvas ao tamanho da imagem
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Desenhar a imagem no canvas
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Definir a altura da barra preta
    const barHeight = 90;

    // Desenhar a barra preta e o texto
    context.fillStyle = 'rgba(0255, 0, 0, 1.0)';
    context.fillRect(0, 0, canvas.width, barHeight);
    context.font = '48px Roboto';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, barHeight / 2 + 16); // Ajuste para centralizar o texto verticalmente

    // Criar um link para download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'imagem-personalizada.png';
    link.click();
});

document.getElementById('new-image-button').addEventListener('click', function() {
    // Reset the form
    document.getElementById('upload-form').reset();
    
    // Hide the image and overlay
    const image = document.getElementById('uploaded-image');
    const textOverlay = document.getElementById('text-overlay');
    
    image.style.display = 'none';
    textOverlay.style.display = 'none';
    
    // Clear the text content
    textOverlay.textContent = '';
});
