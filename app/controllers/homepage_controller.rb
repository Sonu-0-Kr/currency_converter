require 'net/http'

require 'json'




class HomepageController < ApplicationController

  def index

  end

  def fetch_data

    url = 'https://api.exchangerate-api.com/v4/latest/USD'




    uri = URI(url)

    response = Net::HTTP.get(uri)

    data = JSON.parse(response)




    data['rates'].each do |currency_code, rate|

      currency = Currency.new(currency_name: currency_code, rate: rate)

      currency.save

    end




    render json: { message: 'Data fetched and stored successfully' }

  end

end