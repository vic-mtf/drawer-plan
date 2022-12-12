export default function getColor(attrs = {}) {
    return (
        new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'color';
            Object.keys(attrs).forEach((attr) => {
                input[attr] = attrs[attr];
            });
            input.addEventListener('change', () => {
                const { value } = input;
                if(value) resolve(value);
                else reject("Couleur incorrecte");
            });
            input.click();
        })
    );
}