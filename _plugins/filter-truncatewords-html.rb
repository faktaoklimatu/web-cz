require 'nokogumbo'

module Jekyll
  module TruncateWordsHtmlFilter
    ###
    # Truncate +input+ input to at most +max_words+ minding that the input may
    # contain HTML tags.
    def truncatewords_html(input, max_words = 20)
      # The argument is passed as a string from Liquid. We need an integer.
      max_words = Liquid::Utils.to_integer(max_words)

      # Armour spaces within tags by replacing them with the null byte which should
      # not appear in any reasonable input. We do this in order to be able to
      # split according to real word boundaries later.
      words     = input.gsub!(/<.+?>/) { |m| m.gsub(' ', "\0") }.split
      # Join words and dearmour spaces.
      truncated = words[0...max_words].join(' ').gsub("\0", ' ')

      fragment = Nokogiri::HTML5.fragment(truncated)
      if words.length > max_words
        # Append ellipsis if some words were removed.
        fragment.children.last << "\u2026"
      end

      fragment.to_html
    end
  end
end

Liquid::Template.register_filter(Jekyll::TruncateWordsHtmlFilter)
