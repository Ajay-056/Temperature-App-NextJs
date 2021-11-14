const baseUrl = process.env.BASE_URL || 'localhost:1337';

export const converter = (temperatures, from, to, val) => {
  let temperature = {};
  let answer = 0;
  switch (`${from}-${to}`) {
    case 'F-C':
      temperature = getFields(temperatures, from, to);
      answer =
        (val + temperature.offset) * temperature.multiplier +
        temperature.offset_add;
      break;
    case 'C-F':
      temperature = getFields(temperatures, from, to);
      answer =
        (val + temperature.offset) * temperature.multiplier +
        temperature.offset_add;
      break;
    case 'C-K':
      temperature = getFields(temperatures, from, to);
      answer =
        (val + temperature.offset) * temperature.multiplier +
        temperature.offset_add;
      break;
    case 'K-C':
      temperature = getFields(temperatures, from, to);
      answer =
        (val + temperature.offset) * temperature.multiplier +
        temperature.offset_add;
      break;
    case 'F-K':
      temperature = getFields(temperatures, from, to);
      answer =
        (val + temperature.offset) * temperature.multiplier +
        temperature.offset_add;
      break;
    case 'K-F':
      temperature = getFields(temperatures, from, to);
      answer =
        (val + temperature.offset) * temperature.multiplier +
        temperature.offset_add;
      break;
    default:
      answer = val;
      break;
  }
  return answer;
};

export const getFields = (array, from, to) => {
  return array.find((x) => x.from === from && x.to === to);
};

export const fetchQuery = async (path, params = null) => {
  let url;
  if (params !== null) {
    url = `${baseUrl}/${path}/${params}`;
  } else {
    url = `${baseUrl}/${path}`;
  }
  const response = await fetch(`http://${url}`);
  const data = await response.json();
  return data;
};

export const getUniqueTemp = (arr, key) => {
  let keys = arr.map(function (item) {
    return item[key];
  });
  return [...new Set(keys)];
};
