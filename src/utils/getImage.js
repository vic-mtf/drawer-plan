export default function getImage(){
    return (
        new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = "image/*";
            input.addEventListener('change', () => {
                const { files } = input;
                if(files.length) resolve(files);
                else reject("Image non trouvée");
            });
            input.click();
        })
    );
};