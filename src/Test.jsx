export default function Test() {
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

  let i = 0;
  while (i < originalAllItems.length) {
    const id = originalAllItems[i].id;
    const foundIndex = allItems.findIndex((el) => el.id === id);

    if (foundIndex === -1) {
      console.log(
        `Element with id ${id} (${originalAllItems[i].item}) has been removed.`
      );
      i++;
      continue;
    }

    const currEl = allItems[foundIndex].item;
    console.log(`Current id: ${id}, Element: ${currEl}`);

    if (currEl === "a" || currEl === "c" || currEl === "d" || currEl === "f") {
      console.log(`Removing ${currEl}`);
      allItems.splice(foundIndex, 1);
    }

    console.log(
      `Array after check: ${allItems.map((el) => el.item).join(", ")}`
    );
    console.log(` `);
  }
}
