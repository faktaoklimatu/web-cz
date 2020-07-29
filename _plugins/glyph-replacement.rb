# This generator creates non-breaking spaces, thin spaces, dashes and similar glyphs

Jekyll::Hooks.register :site, :post_render do |site|
  Jekyll.logger.info  "                  * Replacing spaces and glyphs ..."
  
  site.documents.each do |page|
    replace!(page.output)
  end
end

def replace!(content)
  # One-letter conjunctions and prepositions should not be left hanging.
  content.gsub!(/ ([aikosuvz]) /i, ' \1&nbsp;')
  # Thin spaces before percent sign, permille sign and before groups of digits.
  content.gsub!(/(?<=\d) (%|‰|\d{3})/, '&#8239;\1')
  # Non-breaking spaces before units.
  content.gsub!(/(?<=\d) (°C|ppm|kg|mil\.)/, '&nbsp;\1')
  content.gsub!(/(?<=\d) ([kMGT]?(?:t CO|Wh?))/, '&nbsp;\1')
end
