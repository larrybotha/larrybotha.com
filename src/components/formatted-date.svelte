<script>
  let rawDate;
  export {rawDate as date};

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(rawDate);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;
</script>

<time datetime={date} {...$$restProps}>{formattedDate}</time>
