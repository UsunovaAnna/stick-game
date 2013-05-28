class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :first_player
      t.string :second_player
      t.string :winner
      t.datetime :created_at

      t.timestamps
    end
  end
end
