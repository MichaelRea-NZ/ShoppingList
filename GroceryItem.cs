using System;
using System.Collections.Generic;
using System.Text;

namespace XamarinIteration1
{
    public class GroceryItem
    {
        public string ItemText { get; set; }
        public bool InTheBasket { get; set; }
        public GroceryItem(string ItemText, bool InTheBasket) 
        {
            this.ItemText = ItemText;
            this.InTheBasket = InTheBasket;
        }
        public override string ToString()
        {
            //Console.WriteLine("To string");
            string result = this.ItemText;
            //Console.WriteLine(result.GetType());
            return result;
        }
    }
}
