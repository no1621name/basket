export interface Item {
  name: string,
  description: string,
  shortDescription: string,
  amount: number,
  price: number,
  imageSrc: string,
  discount?: number,
  id: number,
  selectedSize: string,
  sizeList: SizeList,
}

export interface SizeList {
  [index: string]: number
}

export class Item {
  constructor(obj: Item) {
    obj.selectedSize = Object.keys(obj.sizeList)[0];
    return { ...obj }
  }
}

export class SizeList {
  constructor(obj: SizeList){
    return { ...obj }
  }
}

const listItemsStore = {
  namespace: true,
  state: {
    list: [
      new Item(
        {
          name: 'Bag 1',
          description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt augue dui. Nam vulputate mauris eu velit vulputate semper. Donec feugiat nisi sit amet lobortis bibendum. Duis in orci vel tellus ornare aliquam ac at nisl. Fusce vel pulvinar urna. Suspendisse risus mi, tincidunt non suscipit vel, consectetur scelerisque elit. Nulla luctus, sapien vel eleifend dignissim, felis nisi varius nibh, id efficitur velit urna nec ipsum.',
          shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          amount: 1,
          price: 10,
          imageSrc: 'bag-img-1',
          id: 1,
          selectedSize: '',
          sizeList: new SizeList(
            {
              'XS': 0,
              'S': 1,
              'M': 1.5,
              'L': 2,
              'XL': 2.5,
              '2XL': 3,
              '3XL': 3.5
            }
          ),
        }
      ),
      new Item(
        {
          name: 'Bag 2',
          description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt augue dui. Nam vulputate mauris eu velit vulputate semper. Donec feugiat nisi sit amet lobortis bibendum. Duis in orci vel tellus ornare aliquam ac at nisl. Fusce vel pulvinar urna. Suspendisse risus mi, tincidunt non suscipit vel, consectetur scelerisque elit. Nulla luctus, sapien vel eleifend dignissim, felis nisi varius nibh, id efficitur velit urna nec ipsum.',
          shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          amount: 1,
          price: 20,
          imageSrc: 'bag-img-2',
          id: 2,
          selectedSize: '',
          sizeList: new SizeList(
            {
              'XS': 0,
              'S': 1,
              'M': 1.5,
              'L': 2,
              'XL': 2.5,
              '2XL': 3,
              '3XL': 3.5
            }
          ),
        }
      ),
      new Item(
        {
          name: 'Bag 3',
          description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt augue dui. Nam vulputate mauris eu velit vulputate semper. Donec feugiat nisi sit amet lobortis bibendum. Duis in orci vel tellus ornare aliquam ac at nisl. Fusce vel pulvinar urna. Suspendisse risus mi, tincidunt non suscipit vel, consectetur scelerisque elit. Nulla luctus, sapien vel eleifend dignissim, felis nisi varius nibh, id efficitur velit urna nec ipsum.',
          shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          amount: 1,
          price: 30,
          imageSrc: 'bag-img-3',
          id: 3,
          discount: 30,
          selectedSize: '',
          sizeList: new SizeList(
            {
              'XS': 0,
              'S': 1,
              'M': 1.5,
              'L': 2,
              'XL': 2.5,
              '2XL': 3,
              '3XL': 3.5
            }
          ),
        }
      ),
    ],
  },
  getters: {
    list: ({list}: any) => list,
    sizeList: ({sizeList}: any) => sizeList,
  },
  mutations: {
    DELETE_ITEM(state: any, id: number) {
      const selectedItemIndex = state.list.findIndex((el: Item) => el.id === id)
      state.list.splice(selectedItemIndex, 1);
    },
    EDIT_ITEM(state: any, editedItem: Item) {
      const itemIndex = state.list.findIndex((el: Item) => el.id === editedItem.id);
      const item = state.list[itemIndex];
      Object.assign(item, editedItem);
      item.selectedSize = Object.keys(editedItem.sizeList)[0];
    }
  },
  actions: {
  },
};

export default listItemsStore;