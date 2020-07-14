import {getNotes} from './_notes';

let contents;

export async function get(_, res) {
  if (!contents) {
    const notes = await getNotes();

    contents = JSON.stringify(
      notes.map(note => {
        return {
          title: note.title,
          slug: note.slug,
        };
      }),
    );
  }

  res.writeHead(200, {'Content-Type': 'application/json'});

  res.end(contents);
}
