class AddStepToHistory < ActiveRecord::Migration
  def change
    add_column :histories, :step, :integer
  end
end
