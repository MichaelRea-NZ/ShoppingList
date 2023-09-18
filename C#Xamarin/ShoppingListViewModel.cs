using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.Internals;

namespace XamarinIteration1
{
    internal class ShoppingListViewModel
    {
        public ObservableCollection<GroceryItem> GroceryList { get; set; }
        public ShoppingListViewModel()
        {
            GroceryList = new ObservableCollection<GroceryItem>();

            GroceryList.Add(new GroceryItem("apples", false));
            GroceryList.Add(new GroceryItem("rice", false));
            GroceryList.Add(new GroceryItem("chocolate", false));
            GroceryList.Add(new GroceryItem("jam", false));
            GroceryList.Add(new GroceryItem("milk", false));
        }

        public string NewItemInputValue { get; set; }
        public bool NewCheckedValue { get; set; }
        public string InputField { get; set; }
        public ICommand AddItemCommand => new Command(AddGroceryItem);
        public ICommand RemoveItemCommand => new Command(RemoveGroceryItem);
        public ICommand EditItemCommand => new Command(EditGroceryItem);

        void AddGroceryItem()
        {
            GroceryList.Add(new GroceryItem(NewItemInputValue, false));
            Console.WriteLine("Hello 2");
            Console.WriteLine(GroceryList);
            Console.WriteLine(NewItemInputValue);            
        }

        
        void RemoveGroceryItem(object o)
        {
            GroceryItem groceryItemBeingRemoved = o as GroceryItem;
            Console.WriteLine(groceryItemBeingRemoved);
            GroceryList.Remove(groceryItemBeingRemoved);
        }

        void EditGroceryItem(object o)
        {
            Console.WriteLine("Editing grocery item");
            Console.WriteLine(GroceryList);            
            GroceryItem groceryItemBeingEdited = o as GroceryItem;
            Console.WriteLine(groceryItemBeingEdited);
            groceryItemBeingEdited.ItemText = NewItemInputValue;
            Console.WriteLine("******************************");
            for (int i = 0; i < GroceryList.Count; i++)
            {
                Console.WriteLine(GroceryList[i]);
            }

            bool tick = groceryItemBeingEdited.InTheBasket;
            Console.WriteLine(groceryItemBeingEdited.InTheBasket);
            int newIndex = GroceryList.IndexOf(groceryItemBeingEdited);
            GroceryList.Remove(groceryItemBeingEdited);

            GroceryItem NewGroceryItem = new GroceryItem(NewItemInputValue, tick);

            GroceryList.Add(NewGroceryItem);
            int oldIndex = GroceryList.IndexOf(NewGroceryItem);

            GroceryList.Move(oldIndex, newIndex);            
        }
    }
}
