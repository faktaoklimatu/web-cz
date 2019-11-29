# This generator creates non-breaking spaces, thin spaces, dashes and similar glyphs

Jekyll::Hooks.register :site, :post_render do |site|
  puts "                  * Replacing spaces and glyphs ..."
  
  site.documents.each do |page|
    page.output = replace(page.output)
  end
end

def replace(content)
  content.gsub!(/ ([ai]|[kosuvz]) /i, ' \1&nbsp;')
  content.gsub!(/([0-9]) ([0-9]{3})/, '\1&thinsp;\2')
  content.gsub!(/([0-9]) (%)/, '\1&thinsp;\2')
  content.gsub!(/([0-9]) (°C|ppm|kg|mil\.|tCO)/, '\1&nbsp;\2')
  content.gsub!(/([0-9]) (W|Wh|kW|MW|GW|kWh|MWh|GWh|TWh)/, '\1&nbsp;\2')

  content
end
