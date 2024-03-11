function Report(props) {
  const type = props.type;
  const mean = props.mean;
  const targetId = props.targetId;
  const authorId = props.authorId;

  (async () => {
    await fetch(`/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        targetId: targetId,
        authorId: authorId,
        content: mean,
      }),
    });
  })();
}

export default Report;
