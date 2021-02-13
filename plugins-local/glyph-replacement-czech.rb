# This generator creates non-breaking spaces, thin spaces, dashes and similar glyphs

Jekyll::Hooks.register :site, :post_render do |site|
  Jekyll.logger.info  "                  * Replacing non-breaking spaces (Czech) ..."
  
  site.documents.each do |page|
    replace!(page.output)
  end
end

def replace!(content)
  # One-letter conjunctions and prepositions should not be left hanging.
  content.gsub!(/ ([aikosuvz]) /i, ' \1&nbsp;')
end
