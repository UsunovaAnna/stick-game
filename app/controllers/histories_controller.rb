class HistoriesController < ApplicationController
  # GET /histories
  # GET /histories.json
  def index
    @histories = History.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @histories }
    end
  end

  # GET /histories/1
  # GET /histories/1.json
  def show
    @history = History.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @history }
    end
  end

  # GET /histories/new
  # GET /histories/new.json
  def new
    @history = History.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @history }
    end
  end

  # GET /histories/1/edit
  def edit
    @history = History.find(params[:id])
  end

  # POST /histories
  # POST /histories.json
  def create
    @browser = History.new(params[:history])

    if @browser.step > 0
       @browser.save
    end

    if @browser.sticks > 0

      @host = History.new
      @host.player = 'host'
      @host.game_id = @browser.game_id
      
      if @browser.sticks > 3
        @host.step = rand(1..3);
      else
        
        if @browser.sticks > 1 
          @host.step = @browser.sticks - 1;
        else
          @host.step = 1;
        end
      end
      @host.sticks = @browser.sticks - @host.step;
      @host.save
      @history = @host
    else
      @history = @browser
    end

    if @history.sticks <= 0
      @game = Game.find(@history.game_id)
      @game.winner = @history.player == 'browser' ? 'host' : 'browser'
      @game.save
    end
    
    respond_to do |format|
        format.html { redirect_to @history, notice: 'History was successfully created.' }
        format.json { render json: @history, status: :created, location: @history }
    end
  end

  # PUT /histories/1
  # PUT /histories/1.json
  def update
    @history = History.find(params[:id])

    respond_to do |format|
      if @history.update_attributes(params[:history])
        format.html { redirect_to @history, notice: 'History was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @history.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /histories/1
  # DELETE /histories/1.json
  def destroy
    @history = History.find(params[:id])
    @history.destroy

    respond_to do |format|
      format.html { redirect_to histories_url }
      format.json { head :no_content }
    end
  end
end
