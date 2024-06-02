from tkinter import *
from tkinter import messagebox as tkMessageBox
from collections import deque
import random
import platform
from datetime import datetime

GRID_SIZE_X = 10
GRID_SIZE_Y = 10

STATE_DEFAULT = 0
STATE_REVEALED = 1
STATE_FLAGGED = 2

LEFT_CLICK = "<Button-1>"
RIGHT_CLICK = "<Button-2>" if platform.system() == 'Darwin' else "<Button-3>"

root_window = None

class MinesweeperGame:
    def __init__(self, root):
        self.image_assets = {
            "plain": PhotoImage(file="images/tile_plain.gif"),
            "revealed": PhotoImage(file="images/tile_clicked.gif"),
            "mine": PhotoImage(file="images/tile_mine.gif"),
            "flag": PhotoImage(file="images/tile_flag.gif"),
            "incorrect": PhotoImage(file="images/tile_wrong.gif"),
            "numbers": []
        }
        for i in range(1, 9):
            self.image_assets["numbers"].append(PhotoImage(file=f"images/tile_{i}.gif"))

        self.root = root
        self.main_frame = Frame(self.root)
        self.main_frame.pack()

        self.status_labels = {
            "timer": Label(self.main_frame, text="00:00:00"),
            "mines": Label(self.main_frame, text="Mines: 0"),
            "flags": Label(self.main_frame, text="Flags: 0")
        }
        self.status_labels["timer"].grid(row=0, column=0, columnspan=GRID_SIZE_Y)
        self.status_labels["mines"].grid(row=GRID_SIZE_X+1, column=0, columnspan=int(GRID_SIZE_Y/2))
        self.status_labels["flags"].grid(row=GRID_SIZE_X+1, column=int(GRID_SIZE_Y/2)-1, columnspan=int(GRID_SIZE_Y/2))

        self.start_new_game()
        self.update_timer()

    def setup_board(self):
        self.flag_counter = 0
        self.correct_flag_counter = 0
        self.revealed_counter = 0
        self.start_time = None

        self.board_tiles = {}
        self.total_mines = 0
        for x in range(GRID_SIZE_X):
            for y in range(GRID_SIZE_Y):
                if y == 0:
                    self.board_tiles[x] = {}

                tile_id = f"{x}_{y}"
                mine_present = False

                gfx = self.image_assets["plain"]

                if random.uniform(0.0, 1.0) < 0.1:
                    mine_present = True
                    self.total_mines += 1

                tile = {
                    "id": tile_id,
                    "isMine": mine_present,
                    "state": STATE_DEFAULT,
                    "coords": {"x": x, "y": y},
                    "button": Button(self.main_frame, image=gfx),
                    "mines_count": 0
                }

                tile["button"].bind(LEFT_CLICK, self.handle_left_click(x, y))
                tile["button"].bind(RIGHT_CLICK, self.handle_right_click(x, y))
                tile["button"].grid(row=x+1, column=y)

                self.board_tiles[x][y] = tile

        for x in range(GRID_SIZE_X):
            for y in range(GRID_SIZE_Y):
                mine_count = 0
                for neighbor in self.get_neighbors(x, y):
                    mine_count += 1 if neighbor["isMine"] else 0
                self.board_tiles[x][y]["mines_count"] = mine_count

    def start_new_game(self):
        self.setup_board()
        self.update_status_labels()

    def update_status_labels(self):
        self.status_labels["flags"].config(text=f"Flags: {self.flag_counter}")
        self.status_labels["mines"].config(text=f"Mines: {self.total_mines}")

    def end_game(self, victory):
        for x in range(GRID_SIZE_X):
            for y in range(GRID_SIZE_Y):
                tile = self.board_tiles[x][y]
                if not tile["isMine"] and tile["state"] == STATE_FLAGGED:
                    tile["button"].config(image=self.image_assets["incorrect"])
                if tile["isMine"] and tile["state"] != STATE_FLAGGED:
                    tile["button"].config(image=self.image_assets["mine"])

        self.root.update()

        message = "You Win! Play again?" if victory else "You Lose! Play again?"
        response = tkMessageBox.askyesno("Game Over", message)
        if response:
            self.start_new_game()
        else:
            self.root.quit()

    def update_timer(self):
        time_str = "00:00:00"
        if self.start_time:
            time_delta = datetime.now() - self.start_time
            time_str = str(time_delta).split('.')[0]
            if time_delta.total_seconds() < 36000:
                time_str = "0" + time_str
        self.status_labels["timer"].config(text=time_str)
        self.main_frame.after(100, self.update_timer)

    def get_neighbors(self, x, y):
        neighbors = []
        neighbor_coords = [
            {"x": x-1, "y": y-1},
            {"x": x-1, "y": y},
            {"x": x-1, "y": y+1},
            {"x": x, "y": y-1},
            {"x": x, "y": y+1},
            {"x": x+1, "y": y-1},
            {"x": x+1, "y": y},
            {"x": x+1, "y": y+1},
        ]
        for coord in neighbor_coords:
            try:
                neighbors.append(self.board_tiles[coord["x"]][coord["y"]])
            except KeyError:
                continue
        return neighbors

    def handle_left_click(self, x, y):
        return lambda event: self.on_left_click(self.board_tiles[x][y])

    def handle_right_click(self, x, y):
        return lambda event: self.on_right_click(self.board_tiles[x][y])

    def on_left_click(self, tile):
        if not self.start_time:
            self.start_time = datetime.now()

        if tile["isMine"]:
            self.end_game(False)
            return

        if tile["mines_count"] == 0:
            tile["button"].config(image=self.image_assets["revealed"])
            self.clear_adjacent_tiles(tile["id"])
        else:
            tile["button"].config(image=self.image_assets["numbers"][tile["mines_count"]-1])

        if tile["state"] != STATE_REVEALED:
            tile["state"] = STATE_REVEALED
            self.revealed_counter += 1

        if self.revealed_counter == (GRID_SIZE_X * GRID_SIZE_Y) - self.total_mines:
            self.end_game(True)

    def on_right_click(self, tile):
        if not self.start_time:
            self.start_time = datetime.now()

        if tile["state"] == STATE_DEFAULT:
            tile["button"].config(image=self.image_assets["flag"])
            tile["state"] = STATE_FLAGGED
            tile["button"].unbind(LEFT_CLICK)

            if tile["isMine"]:
                self.correct_flag_counter += 1
            self.flag_counter += 1
            self.update_status_labels()
        elif tile["state"] == STATE_FLAGGED:
            tile["button"].config(image=self.image_assets["plain"])
            tile["state"] = STATE_DEFAULT
            tile["button"].bind(LEFT_CLICK, self.handle_left_click(tile["coords"]["x"], tile["coords"]["y"]))

            if tile["isMine"]:
                self.correct_flag_counter -= 1
            self.flag_counter -= 1
            self.update_status_labels()

    def clear_adjacent_tiles(self, tile_id):
        queue = deque([tile_id])

        while queue:
            current_tile_id = queue.popleft()
            x, y = map(int, current_tile_id.split("_"))

            for neighbor_tile in self.get_neighbors(x, y):
                self.reveal_tile(neighbor_tile, queue)

    def reveal_tile(self, tile, queue):
        if tile["state"] != STATE_DEFAULT:
            return

        if tile["mines_count"] == 0:
            tile["button"].config(image=self.image_assets["revealed"])
            queue.append(tile["id"])
        else:
            tile["button"].config(image=self.image_assets["numbers"][tile["mines_count"]-1])

        tile["state"] = STATE_REVEALED
        self.revealed_counter += 1

def main():
    root_window = Tk()
    root_window.title("Minesweeper")
    MinesweeperGame(root_window)
    root_window.mainloop()

if __name__ == "__main__":
    main()
