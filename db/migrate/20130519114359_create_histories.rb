class CreateHistories < ActiveRecord::Migration
  def change
    create_table :histories do |t|
      t.integer :game_id
      t.string :player
      t.integer :sticks

      t.timestamps
    end
  end
end
