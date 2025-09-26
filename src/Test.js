console.clear();
const arr = ["a", "b", "c", "d", "e", "f", "h"];

let allItems = [];
Object.entries(arr).forEach(([i, item]) => {
  allItems.push({
    id: `${i}`,
    item,
  });
});
const originalAllItems = [...allItems];

console.log(allItems);

console.log("initial: ", originalAllItems.map((el) => el.item).join(", "));
console.log(` `);

let index = 0;
while (index < originalAllItems.length) {
  debugger;
  const elById = allItems.find((el) => +el.id === index);
  if (elById === -1) {
    continue;
  }
  const item = elById.item;
  console.log(elById);

  const id = +originalAllItems.find((el) => el.item === item).id;

  if (index !== id) {
    const foundIndex = allItems.findIndex((el) => el.id === id);
    console.log(foundIndex);
  }

  console.log(
    `Current index: ${index}, Current id: ${id}, ElementById: ${item}`
  );

  if (item === "a" || item === "c" || item === "d" || item === "f") {
    const foundIndex = allItems.findIndex((el) => +el.id === id);
    if (foundIndex !== -1) {
      const removed = allItems.splice(foundIndex, 1);
      console.log(`Removed ${removed[0].item}`);
    }
  }

  index++;
  console.log(`Array after check: ${allItems.map((el) => el.item).join(", ")}`);
  console.log(` `);
}
