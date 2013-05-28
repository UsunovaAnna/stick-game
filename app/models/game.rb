class Game < ActiveRecord::Base
  attr_accessible :created_at, :first_player, :second_player, :winner, :sticks
  has_many :history
end
