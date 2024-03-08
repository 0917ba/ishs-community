import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import CheckList from '@editorjs/checklist';
import Embed from '@editorjs/embed';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  checkList: CheckList,
  list: List,
  header: Header,
  delimiter: Delimiter,
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
