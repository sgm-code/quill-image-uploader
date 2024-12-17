import Quill from 'quill';
import ImageUploader from './quill.imageUploader';

Quill.debug('warn');
Quill.register('modules/imageUploader', ImageUploader);

const fullToolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic'],
  ['clean'],
  ['image'],
];
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: {
      container: fullToolbarOptions,
    },
    imageUploader: {
      upload: (file) => {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
          fileReader.addEventListener(
            'load',
            () => {
              const base64ImageSrc = fileReader.result;
              setTimeout(() => {
                resolve(base64ImageSrc);
                // reject('Issue uploading file');
              }, 1500);
            },
            false,
          );

          if (file) {
            fileReader.readAsDataURL(file);
          } else {
            reject('No file selected');
          }
        });
      },
    },
  },
});

quill.on('text-change', (delta, oldDelta, source) => {
  if (source === 'api') {
    console.log('An API call triggered this change.');
  } else if (source === 'user') {
    console.log('A user action triggered this change.');
  }
  console.log(oldDelta, delta);
});

quill.on('selection-change', (range) => {
  if (range) {
    if (range.length === 0) {
      console.log('User cursor is on', range.index);
    } else {
      const text = quill.getText(range.index, range.length);
      console.log('User has highlighted', text);
    }
  } else {
    console.log('Cursor not in the editor');
  }
});
