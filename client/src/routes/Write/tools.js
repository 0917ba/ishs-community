import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import CheckList from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  checkList: CheckList,
  list: List,
  header: Header,
  delimiter: Delimiter,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file) {
          let formData = new FormData();
          formData.append('file', file);
          const response = await fetch('/upload/image', {
            method: 'POST',
            body: formData,
            mode: 'cors',
          });
          if (response.status === 200) {
            let data = await response.json();
            return {
              success: 1,
              file: {
                url: `/file/image?id=${data.content.filename.split('.')[0]}`,
              }
            }
          } else {
            return {
              success: 0,
              file: {
                url: '',
                message: await response.text(),
              }
            }
          }
        }
      }
    }
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
      },
    }
  }
};
