
export const onsubmit = function(e) {
  const result = Object.fromEntries(new FormData(e.target));
  console.log(result);
  alert(JSON.stringify(result, null, 2));
}