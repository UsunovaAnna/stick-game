class History < ActiveRecord::Base
  attr_accessible :game_id, :player, :sticks, :step
   belongs_to :game
end
