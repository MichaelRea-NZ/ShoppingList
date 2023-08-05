"""Basic shopping list app"""
from tkinter import *


class Model:
    pantry_list = [
    'apples',
    'bread',
    'sugar',
    'rice',
    'chocolate',
    'milk',
    'jam',
    'lettuce'
]
    
    def __init__(self, grocery_list=pantry_list):
        self.grocery_list = grocery_list

    def new_item(self, description):
        self.grocery_list.append(description)

    def get(self):
        return self.grocery_list

    def delete_item(self, description):
        self.grocery_list.remove(description)

    def edit_item(self, index, description):
        self.grocery_list[index] = description


class View():
    def __init__(self, app):
        self.app = app
        self.model = app.model
        self.app.geometry('350x800+0+0')
        self.app.title('Shopping List')
        # set the controller
        self.controller = None

    def set_controller(self, controller):
        self.controller = controller

    def new_item(self):
        self.model.new_item(self.new_grocery_item.get())
        self.show_list()
        self.new_grocery_item.delete(0, END)

    def show_list(self):
        self.lb.delete(0, END)
        pantry_list = self.model.get()
        for item in pantry_list:
            self.lb.insert(END, item)

    def delete_item(self):
        if self.lb.size() > 0:
            self.model.delete_item(self.lb.get(ANCHOR))
            self.show_list()

    def cross_off_item(self):
        self.lb.itemconfig(
            self.lb.curselection(),
            fg='#dedede'
        )

    def uncross_item(self):
        self.lb.itemconfig(
            self.lb.curselection(),
            fg='#464646'
        )

    # takes the coordinates of where the mouse was double clicked
    def select_for_edit(self, event):
        index = self.lb.index(f"@{event.x},{event.y}")
        self.gather_new_item(index)

    def gather_new_item(self, index):
        self.lb.edit_item = index
        editable_item = self.lb.get(index)
        # creates a window widget? focuses on the selected item.
        y0 = self.lb.bbox(index)[1]
        # collects the input text the same as an input box.
        entry = Entry(self.lb, font=('Calibre', 18), fg="#ff0000")
        entry.bind("<Return>", self.change_item)

        entry.insert(0, editable_item)
        # sets the position and size of the window of the selected item.
        entry.place(relx=0, y=y0, relwidth=1, width=-1)

    def change_item(self, event):
        # gets the input from the edit when enter has been pressed.
        new_data = event.widget.get()
        # deletes the old item.
        self.lb.delete(self.lb.edit_item)
        # adds the new item.
        self.lb.insert(self.lb.edit_item, new_data)
        # print(self.lb.edit_item, new_data, self.model.grocery_list)
        self.model.edit_item(self.lb.edit_item, new_data)
        # print(self.lb.edit_item, new_data, self.model.grocery_list)
        # allows cursor to exit
        event.widget.destroy()

    def set_shopping_list(self):
        # Input box
        self.new_grocery_item = Entry(
            # self.frame,
            font=('Calibre', 18),
            fg="#464646",
        )
        self.new_grocery_item.insert(END, '')
        self.new_grocery_item.pack(pady=10)

        # Add item to list button

        self.add_grocery_item_btn = Button(
            # frame,
            text='Add to list',
            font=('Calibre', 13),
            bg='red',
            padx=10,
            pady=5,
            command=self.new_item
        )
        self.add_grocery_item_btn.pack()

        # Shopping list listbox

        self.lb = Listbox(
            # frame,
            width=25,
            height=10,
            font=('Calibre', 18),
            bd=0,
            highlightthickness=20,
            # fg='#000000',

        )
        self.lb.pack(pady=10)

        self.show_list()

        self.delete_grocery_item_btn = Button(
            # frame,
            text='Remove from list',
            font=('Calibre', 13),
            bg='red',
            padx=10,
            pady=5,
            command=self.delete_item
        )
        self.delete_grocery_item_btn.pack(pady=10)

        self.added_to_basket_btn = Button(
            # frame,
            text='In the basket',
            font=('Calibre', 13),
            bg='red',
            padx=10,
            pady=5,
            command=self.cross_off_item
        )
        self.added_to_basket_btn.pack(pady=10)

        self.return_to_list_btn = Button(
            # frame,
            text='Return to list',
            font=('Calibre', 13),
            bg='red',
            padx=10,
            pady=5,
            command=self.uncross_item
        )
        self.return_to_list_btn.pack(pady=10)

        # double clicking on the item to edit
        self.lb.bind("<Double-1>", self.select_for_edit)


class Controller:
    def __init__(self, model, view):
        self.model = model
        self.view = view


class App(Tk):
    def __init__(self):
        super().__init__()     

        # create the model
        self.model = Model()

        # create a view and place it on the root window
        self.view = View(self)

        # create the controller
        self.controller = Controller(self.model, self.view)

        # set the controller to view
        self.view.set_controller(self.controller)

        # put data in the view
        self.view.set_shopping_list()


if __name__ == '__main__':
    app = App()

    app.mainloop()
