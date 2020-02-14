# Dumb regex-based truncatewords filter that automatically closes open HTML tags

require 'set'

module Jekyll
  module TruncateWordsHtmlFilter
    @@tag_re = /<(\/)?([^> ]+)[^>]*>/
    @@separator_re = /[^[:word:]]+/

    private
    def append_words(chunk, words)
      chunk_pos = 0
      output = ""
      while words > 0 and m_sep = @@separator_re.match(chunk, chunk_pos) do
        if (words -= 1) <= 0
          output += chunk[chunk_pos...m_sep.begin(0)]
        else
          output += chunk[chunk_pos...m_sep.end(0)]
        end
        chunk_pos = m_sep.end(0)
      end

      if chunk.length - chunk_pos > 0 and (words -= 1) >= 0
        output += chunk[chunk_pos...chunk.length]
      end

      return output, words
    end

    public
    def truncatewords_html(input, words)
      open_tags = Set[]
      pos = 0
      output = ""

      while m_tag = @@tag_re.match(input, pos) do
        chunk = input[pos...m_tag.begin(0)]
        chunk, words = append_words(chunk, words)
        output += chunk
        pos = m_tag.end(0)

        if words <= 0
          break
        end

        output += m_tag[0]
        if m_tag[1].nil?
          open_tags.add(m_tag[2])
        else
          open_tags.delete(m_tag[2])
        end
      end

      chunk = input[pos...input.length]
      chunk, words = append_words(chunk, words)
      output += chunk

      if words <= 0 then
        output += "&#8230;"
        for tag in open_tags do
          output += "</%s>" % [ tag ]
        end
      end

      return output
    end
  end
end

Liquid::Template.register_filter(Jekyll::TruncateWordsHtmlFilter)
