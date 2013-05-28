class AddSticksToGame < ActiveRecord::Migration
  def change
    add_column :games, :sticks, :integer
  end
end
