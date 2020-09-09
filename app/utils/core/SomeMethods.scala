package utils.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0
 */

import models.core.Size

object SomeMethods {
  def removeElementFromSeq[A](seq: Seq[A], index: Int): Seq[A] = {
    if (index < 0) {
      seq
    } else if (index == 0) {
      seq.tail
    } else {
      // splitAt keeps the matching element in the second group
      val (a, b) = seq.splitAt(index)
      a ++ b.tail
    }
  }

  def changeSeqSizeToPlus(seq: Seq[Size], size: String) = seq.collect {
    case s if (s.number == size) => s.copy(quantity = s.quantity + 1)
    case s if (s.number != size) => s
  }

  def changeSeqSizeToMinus(seq: Seq[Size], size: String) = seq.collect {
    case s if (s.number == size) => s.copy(quantity = s.quantity - 1)
    case s if (s.number != size) => s
  }

  def setSizeQtyToLastItem(seq: Seq[Size], size: String) = seq.collect {
    case s if (s.number == size) => s.copy(
      quantity = s.quantity - 1,
      availability = "Last Item"
    )
    case s if (s.number != size) => s
  }

  def changeSeqSizeToMinusQty(seq: Seq[Size], size: String, qty: Int) = seq.collect {
    case s if (s.number == size) => s.copy(quantity = s.quantity - qty)
    case s if (s.number != size) => s
  }

  def changeSeqSizeToMinusQtyLastItem(seq: Seq[Size], size: String, qty: Int) = seq.collect {
    case s if (s.number == size) => s.copy(
      quantity = s.quantity - qty,
      availability = "Last Item"
    )
    case s if (s.number != size) => s
  }

  def changeSeqSizeQty(seq: Seq[Size], sizeRm: String, size: String, qty: Int) = seq.collect {
    case s if (s.number == sizeRm) => s.copy(number = size, quantity = qty)
    case s if (s.number != sizeRm) => s
  }

  def getSizeQty(seq: Seq[Size], sizeToAdd: String): Int =
    seq.filter(s => s.number == sizeToAdd).foldLeft(0) { (i: Int, s: Size) => i + s.quantity }

  def changeSeqSizeToPlusQty(seq: Seq[Size], size: String, qty: Int) = seq.collect {
    case s if (s.number == size) => s.copy(quantity = s.quantity + qty)
    case s if (s.number != size) => s
  }

  def changeQtyOfSize(seq: Seq[Size], size: String, qty: Int) = seq.collect {
    case s if (s.number == size) => s.copy(quantity = qty)
    case s if (s.number != size) => s
  }

  def changeSizeAvailability(seq: Seq[Size], size: String) = seq.collect {
    case s if (s.number == size) => s.copy(availability = "Size Returned")
    case s if (s.number != size) => s
  }
}
